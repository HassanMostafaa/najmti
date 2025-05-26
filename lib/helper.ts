export const parse = (str: string) => {
  return JSON.parse(str);
};

export const handleOverlayClick = (
  e: React.MouseEvent<HTMLDivElement>,
  closeModal: () => void
) => {
  if (e.target === e.currentTarget) {
    e.stopPropagation();
    closeModal();
  }
};
