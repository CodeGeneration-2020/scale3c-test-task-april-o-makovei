import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import cls from 'classnames';
import CustomButton from '../button/button';

export interface ModalProps {
  className?: string;

  style?: React.CSSProperties;

  visible?: boolean;

  error?: string;
  isLoading?: boolean;

  bodyEl?: 'div' | 'form';

  onClose?: () => void;
  onSave: () => void;

  title?: string;

  closeText?: string;
  saveText?: string;

  children?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const [isDocumentLoaded, setIsDocumentLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof document !== undefined) {
      setIsDocumentLoaded(true);
    }
  }, [typeof document]);

  const {
    className,
    style,
    visible,
    closeText = 'Close',
    saveText = 'Save',
    error,
    children,
    title,
    bodyEl = 'div',
    isLoading = false,
    onSave = () => null,
    onClose = () => null,
  } = props;

  const BodyEl = bodyEl;

  const wrapperRef = React.createRef<HTMLDivElement>();

  const renderModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.125 }}
      ref={wrapperRef}
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-70 overflow-y-auto overflow-x-hidden select-none z-50000 p-48 md:p-24"
    >
      <motion.div
        className={`flex flex-col w-96 h-96 relative gap-3 px-10 rounded-md shadow-md border border-gray bg-white max-w-screen-lg z-50 ${className}`}
        style={style}
        initial={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <header className="flex items-center justify-between">
          <div>{title && title}</div>
          <button
            onClick={onClose}
            className="top-0 right-0 p-4 pr-0"
            aria-label="Close"
          >
            <svg
              className="w-6 h-6 text-gray hover:text-gray-dark transition-colors duration-200 ease-in-out cursor-pointer fill-current stroke-current stroke-2 stroke-current stroke-linecap-round stroke-linejoin-round hover:stroke-gray-dark hover:text-gray-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        <BodyEl className={cls('relative h-full w-full', className)}>
          {children}
        </BodyEl>
        {error && <div>{error}</div>}
        {!isLoading && (
          <div className="flex gap-5 justify-end mb-5">
            <CustomButton onClick={onClose}>{closeText}</CustomButton>
            <CustomButton onClick={onSave}>{saveText}</CustomButton>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return isDocumentLoaded
    ? ReactDOM.createPortal(
        <AnimatePresence>{visible ? renderModal() : null}</AnimatePresence>,
        document?.body
      )
    : null;
});

export default Modal;
