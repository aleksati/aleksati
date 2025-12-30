// import { useIsMounted } from "../hooks/useIsMounted";
import ClientOnlyPortal from "./ClientOnlyPortal";
import { useRef, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import Search from "./Search";

const ModalSearch = () => {
  // This is new for SearchMobile
  const [SearchIsEnabled, setSearchIsEnabled] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = () => setSearchIsEnabled(false);

  const handleClickOutside = (e: React.MouseEvent<HTMLElement>) => {
    const item = e.target as HTMLElement;
    if (modalRef.current && modalRef.current.contains(item)) return;
    return closeModal();
  };

  return (
    <>
      {!SearchIsEnabled ? (
        <ButtonIcon
          iconId="search"
          iconSize="md"
          onClick={() => setSearchIsEnabled(true)}
        />
      ) : (
        <ClientOnlyPortal selector="#modal">
          <aside
            // tag="aside"
            role="dialog"
            tabIndex={-1}
            aria-modal="true"
            onClick={handleClickOutside}
            // onKeyDown={handleKeyDown}
            className="fixed inset-0 z-50 items-start p-2 backdrop-brightness-50">
            {/* The Modal Card*/}
            <div ref={modalRef} className="pt-6">
              <Search />
            </div>
            <div className="absolute right-6 top-10 pt-1">
              <ButtonIcon
                aria-label="Close SearchMobile"
                onClick={closeModal}
                iconSize="text-2xl"
                // ref={closeBtnRef}
                iconId="x"
              />
            </div>
          </aside>
        </ClientOnlyPortal>
      )}
    </>
  );
};

ModalSearch.displayName = "ModalSearch";

export default ModalSearch;
