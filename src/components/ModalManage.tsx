import React, { useReducer, useContext, Dispatch, useCallback } from 'react';

export interface ModalManagerProps {
  children: React.ReactNode;
  modalComponentMap: {
    [prop: string]: React.ComponentType<any>;
  };
}

interface ModalState {
  modalType: string | number;
  modalProps: any;
}

type ModalAction =
  | {
      type: 'SHOW_MODAL';
      modalType: string | number;
      modalProps: any;
    }
  | {
      type: 'HIDE_MODAL';
    };

// state设计成数组, 可以同时显示多个弹窗. 按照栈的方式后进先关闭.
function reducer(state: ModalState[], action: ModalAction) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return state.concat({ modalType: action.modalType, modalProps: action.modalProps });
    case 'HIDE_MODAL': {
      const newState = state.slice();
      newState.pop();
      return newState;
    }
    default:
      return state;
  }
}

const initialState: ModalState[] = [];

export function showModal<T extends object = any>(modalType: string) {
  return (modalProps: T) => ({
    type: 'SHOW_MODAL' as 'SHOW_MODAL',
    modalType,
    modalProps
  });
}

export const ModalContext = React.createContext<Dispatch<ModalAction>>(() => {});

function ModalManager({ children, modalComponentMap }: ModalManagerProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderModal = (modalDescription: ModalState) => {
    const { modalType, modalProps = {} } = modalDescription;
    const ModalComponent = modalComponentMap[modalType];
    if (!ModalComponent) {
      // eslint-disable-next-line no-console
      console.warn(`${modalType} is not in the modalComponentMap`);
      return null;
    }
    return <ModalComponent {...modalProps} key={modalType} />;
  };

  return (
    <ModalContext.Provider value={dispatch}>
      {children}
      {state.map(renderModal)}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};

export const useModalClose = () => {
  const diapatchModal = useModal();
  return useCallback(() => {
    diapatchModal({
      type: 'HIDE_MODAL' as 'HIDE_MODAL'
    });
  }, [diapatchModal]);
};

export default ModalManager;
