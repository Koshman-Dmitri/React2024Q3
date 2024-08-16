import { useAppSelector } from '../../redux/hooks/hooks';
import styles from './AutocompleteControl.module.css';

type ComponentProps = {
  propValue: string;
  handleSuggestionClick: (suggestion: string) => void;
};
type ListType = { [key: string]: string };

function Autocomplete({ propValue, handleSuggestionClick }: ComponentProps) {
  const countries = useAppSelector((state) => state.countries);

  let suggestions: ListType = {};

  if (propValue.length) {
    const filteredSuggestions = Object.entries(countries).filter((suggestion) =>
      suggestion[1].toLowerCase().includes(propValue.toLowerCase())
    );

    if (filteredSuggestions.length === 1 && propValue === filteredSuggestions[0][1])
      suggestions = {};
    else suggestions = Object.fromEntries(filteredSuggestions);
  }

  return (
    <div className={styles.autocomplete}>
      {Object.keys(suggestions).length > 0 && (
        <ul className={styles.list}>
          {Object.entries(suggestions).map((suggestion) => (
            <li
              key={suggestion[0]}
              role="presentation"
              onClick={() => handleSuggestionClick(suggestion[1])}
            >
              {suggestion[1]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
