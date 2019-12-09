import React, { useReducer, useContext, useMemo } from 'react';

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

const ModalContext = React.createContext<{
  hide(): void;
  show<T>(modalType: string, modalProps?: T | undefined): void;
  dispatch: React.Dispatch<ModalAction>;
}>({} as any);

export const useModal = () => {
  return useContext(ModalContext);
};

function ModalManager({ children, modalComponentMap }: ModalManagerProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const modal = useMemo(() => {
    return {
      hide() {
        dispatch({
          type: 'HIDE_MODAL' as 'HIDE_MODAL'
        });
      },
      show<T>(modalType: string, modalProps?: T) {
        dispatch({
          type: 'SHOW_MODAL' as 'SHOW_MODAL',
          modalType,
          modalProps
        });
      },
      dispatch
    };
  }, []);

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
    <ModalContext.Provider value={modal}>
      {children}
      {state.map(renderModal)}
    </ModalContext.Provider>
  );
}

export default ModalManager;
