import { Feature } from "@/components";
import { FEATURE_LIST } from "@/constants";
import "./style.scss";

export function FeatureGrid() {
    return (
        <div className="component-container home-feature">
            {FEATURE_LIST.map((item, index) => (
                <Feature
                    key={index}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    className="home-feature__feature-item"
                />
            ))}
        </div>
    );
}