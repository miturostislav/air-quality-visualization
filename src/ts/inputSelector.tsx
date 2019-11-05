import * as React from 'react';

export interface Name {
  name: string;
}

interface InputSelectorProps<T> {
  values: T[];
  onSelectValue: (value: T) => void;
  label: string;
}

function InputSelector<T extends Name>({ values, onSelectValue, label }: InputSelectorProps<T>) {
  const [input, setInput] = React.useState('');
  const filteredValuesByInput = React.useMemo(() => (
    values.filter((value) => (
      value.name && value.name.toLowerCase().indexOf(input.toLocaleLowerCase()) === 0
    ))
  ), [input, values]);
  const [isSelectorFocused, setIsSelectorFocused] = React.useState(false);
  const inputSelectorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (inputSelectorRef.current && !inputSelectorRef.current.contains(e.target as Node)) {
        onBlur();
      }
    }

    document.body.addEventListener('click', onClick);
    return () => document.body.removeEventListener('click', onClick);
  });

  function onChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
  }

  function onFocus() {
    setIsSelectorFocused(true);
  }

  function onBlur() {
    setIsSelectorFocused(false);
  }

  function onSelect(value: T) {
    onSelectValue(value);
    setInput('');
    setIsSelectorFocused(false);
  }
  return (
    <div className={`input-selector ${isSelectorFocused ? 'input-selector--has-focus' : ''}`} ref={inputSelectorRef}>
      <div className="input-selector__input-wrapper">
        <input
          type="text"
          className={`input-selector__input ${!!input ? 'input-selector__input--has-value' : ''}`}
          name="countrySelector"
          id="countrySelector"
          onFocus={onFocus}
          onChange={onChange}
          value={input}
          autoComplete="ignore"
        />
        <label className="input-selector__label" htmlFor="countrySelector">{label}</label>
      </div>
      <div className="input-selector__suggestions">
        <ul className="input-selector__suggestions-list">
          {
            filteredValuesByInput.map((value) => (
              <li key={value.name} className="input-selector__suggestions-item">
                <button className="input-selector__suggestions-item-button" onClick={() => onSelect(value)}>{value.name}</button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default InputSelector;