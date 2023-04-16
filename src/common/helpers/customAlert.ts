import { ModalStaticFunctions } from 'antd/es/modal/confirm';
import { NextRouter } from 'next/router';

type CountDownType = 'success' | 'error';

type CustomAlertProps = {
  modal: Omit<ModalStaticFunctions, 'warn'>;
  Message: string;
  type: CountDownType;
  router?: NextRouter;
  link?: string;
};

const CustomAlert = ({ modal, Message: message, type, router, link }: CustomAlertProps): void => {
  let secondsToGo = 5;
  let instance: ReturnType<typeof modal.error> | ReturnType<typeof modal.success>;
  let timer: NodeJS.Timeout;

  const clearTimerAndRedirect = () => {
    clearInterval(timer);
    if (type === 'success' && router) {
      router.push(link || '/');
    }
  };

  const startTimer = () => {
    timer = setInterval(() => {
      secondsToGo -= 1;
      if (type === 'success') {
        instance.update({
          content: `畫面將於 ${secondsToGo} 秒後跳轉`,
        });
      } else {
        instance.update({
          content: `視窗將於 ${secondsToGo} 秒後關閉`,
        });
      }
    }, 1000);
  };

  if (type === 'error') {
    instance = modal.error({
      title: `${message}`,
      okText: '確定',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        clearInterval(timer);
        instance.destroy();
      },
      onCancel: () => {
        clearInterval(timer);
        instance.destroy();
      },
    });
  } else if (type === 'success') {
    instance = modal.success({
      title: `${message}`,
      okText: '確定',
      centered: true,
      onOk: () => {
        clearInterval(timer);
        instance.destroy();
        clearTimerAndRedirect();
      },
    });
  } else {
    throw new Error(`Invalid count down type: ${type}`);
  }

  startTimer();

  setTimeout(() => {
    clearInterval(timer);
    if (type === 'success') {
      instance.destroy();
      clearTimerAndRedirect();
    } else if (type === 'error') {
      instance.destroy();
    }
  }, secondsToGo * 1000);
};

export default CustomAlert;
