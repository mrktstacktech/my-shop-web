import type { InputFormFieldType } from "./type"

const styles = {
    label: "block text-sm font-medium text-gray-700 mb-1",
    container: "flex group focus:border-gray-200 focus:border-1 ",
    input: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
    textarea: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none",
    errorText: "text-red-500 text-xs mt-1",
    hintText: "text-gray-500 text-xs mt-1",
}

export function InputFormField(props: InputFormFieldType) {
    return (
        <>
            {props.label? (
                <label htmlFor={props.id} className={styles.label}>
                    {props.label}
                </label>
            ) : null}
            
            <div className={`${props.className}`}>
                {props.prefix && <span className="mr-2">{props.prefix}</span>}
                <input
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    placeholder={props.placeholder}
                    required={props.required}
                    className={`w-full resize-none focus:ring-none focus:border-none focus:outline-none`}
                    style={props.style}
                    onChange={(e) => props.onChange(e.target.value)}
                />
                {props.suffix && <span className="ml-2">{props.suffix}</span>}
            </div>
            {props.errorText && <p className="text-red-500 text-xs mt-1">{props.errorText}</p>}
            {props.hintText && !props.errorText && <p className="text-gray-500 text-xs mt-1">{props.hintText}</p>}
        </>
    )
}