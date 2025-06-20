import type { CardType } from "./type"
import { useState } from "react";
import { StarRating } from "@components";

const styles = {
    hovered: "absolute flex flex-col right-0 top-0 bottom-0 left-0 h-full p-0",
    notHovered: "hidden",
    button: "bg-white absolute rounded-full p-1 mt-2 mr-2",
    likeIcon: "right-0 top-0",
    eyeIcon: "right-0 top-8",
    addToCart: "absolute bg-black text-white inset-x-0 bottom-0 h-1/7 rounded-b-sm text-sm"
}

export function Card({ ...props }: CardType) {
    const [isHovered, setIsHovered] = useState(false);
 
    const priceDiscounted = props.discountPercentage
        ? Math.round(props.price - (props.price * props.discountPercentage / 100))
        : props.price;

    const likeIcon = 
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
        </svg>;
    
    const eyeIcon = 
        <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
            <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>;

    return (
        <div className="max-w-[250px] w-full">
            <div onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative bg-(--item-background-color) flex items-center justify-center h-48 w-full p-0 rounded-sm mb-2"
            >
                {props.discountPercentage ? <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-sm absolute top-2 left-2">-{props.discountPercentage}%</span> : null}
                <div
                    className={isHovered ? styles.hovered : styles.notHovered}
                >
                    <button className={`${styles.button} ${styles.likeIcon}`}>{likeIcon}</button>
                    <button className={`${styles.button} ${styles.eyeIcon}`}>{eyeIcon}</button>
                    <button className={`${styles.addToCart}`}>Add to cart</button>
                </div>
                <img className={`w-20`} src={props.thumbnail} alt={props.title} />

            </div>
            <h2 className="font-medium mt-1 mb-1">{props.title}</h2>
            <div className={props.discountPercentage ? "flex-col" : " flex items-center gap-2 mb-2"}>
                <div className="text-sm"><span className="text-red-500">${priceDiscounted}</span> {props.discountPercentage ? <span className="line-through text-gray-400">${props.price}</span> : null}</div>
                <StarRating rating={props.rating ?? 0} reviewNumber={props.reviewNumber ?? 0} />
            </div>

        </div>
    )
}