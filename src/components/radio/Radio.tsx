import type { RadioProps } from "./type";

export function Radio({
    options,
    disabled = false,
    onChange,
    label,
    className,
    id,
    style,
    type = "radio",
}: RadioProps) {
    return (
        <div className={className}>
            <label htmlFor={id} className={`${className}__label`}>
                {label}
            </label>
            <div className={`${className}__options`}>
                {options.map((option) => (
                    <div key={option.value} className={`${className}__options__option`}>
                        <input
                            type={type}
                            id={id ? `${id}-${option.value}` : option.value}
                            name={id || "radio-group"}
                            value={option.value}
                            onClick={() => onChange && onChange(option.value) }
                            disabled={disabled}
                            style={style}
                            className={`${className}__input`}
                            defaultChecked={option.value === options[0].value} // Default to the first option
                        />
                        <label htmlFor={id ? `${id}-${option.value}` : option.value}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}