import {TextField} from "@simplybusiness/mobius";
import clsx from "clsx";
import {
  ChangeEvent,
  FocusEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Combobox.css";
import {ComboboxList} from "./ComboboxList";
import {ComboboxListGroup} from "./ComboboxListGroup";
import {filterOptions} from "./helpers";
import {isOptionGroup, Option, OptionGroup, Options} from "./types";
import {useDebouncedValue} from "./useDebouncedValue";

export type ComboboxProps = {
  label: string;
  options?: Options;
  onSelected?: (option: Option) => void;
  onChange?: (searchTerm: string) => Promise<Options>;
  isFetching?: boolean;
  delay?: number;
};

type ShowOptionsEvent =
  | ChangeEvent<HTMLInputElement>
  | FocusEvent<Element, Element>;

export const Combobox = ({
  label,
  options,
  onSelected,
  onChange,
  delay = 0,
}: ComboboxProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(options || []);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebouncedValue(inputValue, delay);
  const isGrouped = options && isOptionGroup(options);
  const isSynchronous = !!options && delay === 0;

  const updateInput = async (e: ShowOptionsEvent) => {
    const searchTerm = (e.target as HTMLInputElement).value ?? "";

    setInputValue(searchTerm);
    // Default change action is to filter options
    if (isSynchronous) {
      const searchResults = filterOptions(options, searchTerm);
      if (searchResults.length) {
        setDisplayOptions(searchResults);
        setExpanded(true);
      }
    }
  };

  const asyncSearch = useCallback(
    async (searchTerm: string) => {
      if (onChange) {
        const searchResults = await onChange(searchTerm);

        if (searchResults.length) {
          setDisplayOptions(searchResults);
          setExpanded(true);
        }
      }
    },
    [onChange],
  );

  // Debounce asynchronous search
  useEffect(() => {
    asyncSearch(debouncedValue);
  }, [asyncSearch, debouncedValue]);

  const hideOptions = () => {
    setExpanded(false);
    // inputRef?.current?.focus();
  };

  // Show options on focus, if supplied as a prop
  const handleFocus = (e: FocusEvent<Element, Element>) => {
    if (options?.length) {
      updateInput(e);
    }
  };

  const handleSelected = (option: Option) => {
    if (option) {
      onSelected?.(option);
      setInputValue(option.text);
      hideOptions();
    }
  };

  // Hide list on click outside or Escape/Tab key
  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Tab") hideOptions();
    };
    const tapListener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !listRef?.current ||
        listRef?.current.contains(event.target as HTMLElement)
      ) {
        return;
      }
      hideOptions();
    };

    document.addEventListener("keydown", keyListener);
    document.addEventListener("mousedown", tapListener);
    document.addEventListener("touchstart", tapListener);

    return () => {
      document.removeEventListener("keydown", keyListener);
      document.removeEventListener("mousedown", tapListener);
      document.removeEventListener("touchstart", tapListener);
    };
  });

  const listClasses = clsx("combobox__list", {expanded});

  return (
    <div className="combobox__container">
      <div
        aria-label={label}
        role="combobox"
        aria-expanded={expanded}
        className="combobox__input-wrapper"
      >
        <TextField
          ref={inputRef}
          label={label}
          value={inputValue}
          onChange={updateInput}
          onFocus={handleFocus}
        />
      </div>
      <div
        tabIndex={0}
        role="listbox"
        aria-label="Pick an animal"
        className={listClasses}
      >
        {isGrouped ? (
          (displayOptions as OptionGroup[]).map((group) => (
            <ComboboxListGroup
              listRef={listRef}
              key={group.category}
              {...group}
              onSelected={handleSelected}
            />
          ))
        ) : (
          <ComboboxList
            listRef={listRef}
            options={displayOptions as Option[]}
            onSelected={handleSelected}
          />
        )}
      </div>
    </div>
  );
};
