import type { InputFormFieldType } from "./type"
import { useRef } from "react"

const styles = {
    label: "block text-sm font-medium text-gray-700 mb-1",
    container: "flex group focus:border-gray-200 focus:border-1 ",
    input: "block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
    textarea: "block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none",
    errorText: "text-red-500 text-xs mt-1",
    hintText: "text-gray-500 text-xs mt-1",
}

export function InputFormField({ isMultiline = false, ...props }: InputFormFieldType) {
    const inputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    
    return (
        <div className={`${props.className}`}>
            {props.label ? (
                <label htmlFor={props.id} className={styles.label + ` ${props.className}__label`}>
                    {props.label}
                </label>
            ) : null}

            <div className={`${props.className}__field`}>
                {props.prefix && <span className={`mr-2 ${props.className}__field__prefix`}>{props.prefix}</span>}

                {isMultiline ? (
                    <textarea
                        ref={textareaRef}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        placeholder={props.placeholder}
                        required={props.required}
                        className={`w-full resize-none border-none focus:ring-none focus:border-none focus:outline-none ${props.className}__field__input`}
                        style={props.style}
                        onChange={(e) => props.onChange(e.target.value)}
                        onClick={() => props.onClick && props.onClick()}
                        rows={4}
                    />
                ) : (
                    <input
                        ref={inputRef}
                        id={props.id}
                        name={props.name}
                        value={props.value}
                        type={props.type}
                        placeholder={props.placeholder}
                        required={props.required}
                        className={`w-full resize-none focus:ring-none focus:border-none focus:outline-none ${props.className}__field__input`}
                        style={props.style}
                        onChange={(e) => props.onChange(e.target.value)}
                        onClick={() => props.onClick && props.onClick()}
                    />
                )}
                {props.suffix && <span onClick={props.onSuffixClick} className={`ml-2 ${props.className}__field__suffix`}>{props.suffix}</span>}
            </div>
            {props.errorText && <p className={`text-red-500 text-xs mt-1 ${props.className}__errorText`}>{props.errorText}</p>}
            {props.hintText && !props.errorText && <p className={`text-gray-500 text-xs mt-1 ${props.className}__field__hintText`}>{props.hintText}</p>}
        </div>
    )
}