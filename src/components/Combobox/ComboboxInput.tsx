import {useId} from "react";

type ComboboxInputProps = {
  expanded: boolean;
  showList: () => void;
};

export const ComboboxInput = ({expanded, showList}: ComboboxInputProps) => {
  const id = useId();
  const labelId = useId();

  return (
    <div
      aria-labelledby={labelId}
      role="combobox"
      aria-expanded={expanded}
      className="combobox__input-wrapper"
    >
      <label id={labelId} className="combobox__label">
        Animal
      </label>
      <input
        id={id}
        type="text"
        aria-autocomplete="list"
        aria-labelledby={labelId}
        autoComplete="off"
        className="combobox__input"
        tabIndex={0}
        onChange={showList}
      />
    </div>
    /* <i aria-hidden="true" className="dropdown icon"></i> */
  );
};
