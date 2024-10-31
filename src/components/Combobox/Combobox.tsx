import {TextField} from "@simplybusiness/mobius";
import clsx from "clsx";
import {
  FocusEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Combobox.css";
import {ComboboxList} from "./ComboboxList";
import {ComboboxListGroup} from "./ComboboxListGroup";
import {filterOptions} from "./helpers";
import {
  ComboboxProps,
  isOptionGroup,
  Option,
  OptionGroup,
  ShowOptionsEvent,
} from "./types";
import {useDebouncedValue} from "./useDebouncedValue";

export const Combobox = ({
  label,
  defaultValue = "",
  options,
  onSelected,
  onChange,
  delay = 0,
}: ComboboxProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(options || []);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );
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

  const hideOptions = () => {
    setExpanded(false);
    // TODO: set a flag to prevent showing options after input change
    // inputRef?.current?.focus();
  };

  // Show options on focus, if supplied as a prop
  const handleFocus = (e: FocusEvent<Element, Element>) => {
    if (options?.length) {
      updateInput(e);
    }
  };

  const handleSelected = async (option: Option) => {
    if (option.callback) {
      // Handle a repeat search or drill down
      const {error, options} = await option.callback();

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setDisplayOptions(options!);
    } else {
      onSelected?.(option);
      setInputValue(option.text);
      hideOptions();
    }
  };

  const asyncSearch = useCallback(
    async (searchTerm: string) => {
      if (onChange) {
        const {error, options} = await onChange(searchTerm);

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        if (options?.length) {
          setDisplayOptions(options);
          setExpanded(true);
        }
      }
    },
    [onChange],
  );

  // Debounce asynchronous search
  useEffect(() => {
    if (debouncedValue !== defaultValue) {
      asyncSearch(debouncedValue);
    }
  }, [asyncSearch, debouncedValue, defaultValue]);

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
    // @ts-expect-error event type
    document.addEventListener("mousedown", tapListener);
    document.addEventListener("touchstart", tapListener);

    return () => {
      document.removeEventListener("keydown", keyListener);
      // @ts-expect-error event type
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
          errorMessage={errorMessage}
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
