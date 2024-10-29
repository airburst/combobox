import {RefObject, useCallback, useEffect, useState} from "react";
import {ComboboxListItem} from "./ComboboxListItem";
import {Option} from "./types";

type ComboboxListProps = {
  listRef: RefObject<HTMLUListElement>;
  options: Option[];
  onSelected?: (option: Option) => void;
};

export const ComboboxList = ({
  listRef,
  options,
  onSelected,
}: ComboboxListProps) => {
  const [focusId, setFocusId] = useState<number>(0);
  const handleOptionClick = useCallback(
    (option: Option) => {
      onSelected?.(option);
    },
    [onSelected],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // TODO: Home and End keys
      // TODO: Don't cycle
      // TODO: Kill focus on Escape/Tab
      // TODO: Add to ListGroup
      if (event.code === "ArrowDown") {
        if (focusId === options.length - 1) {
          setFocusId(0);
          return;
        }

        setFocusId(focusId + 1);
      }

      if (event.code === "ArrowUp") {
        if (focusId === 0) {
          setFocusId(options.length - 1);
          return;
        }

        setFocusId(focusId - 1);
      }

      if (event.code === "Enter") {
        if (focusId === 0 && options) {
          const [firstTrade] = options;
          handleOptionClick(firstTrade);
        }
      }
    },
    [focusId, handleOptionClick, options],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ul role="group" ref={listRef}>
      {options.map((option, index) => (
        <ComboboxListItem
          key={option.id}
          {...option}
          focused={index === focusId}
          onSelected={onSelected}
        />
      ))}
    </ul>
  );
};
