import './style.scss';
import { Feature } from '@components';
import { INTRO_LIST, FEATURE_LIST, AVATAR_DEFAULT } from '@constants';
import { Avatar } from '@components';

export function AboutPage() {
    return (
        <div className="about-page">
            <div className="about-page__header">
                <div className="about-page__header__text">
                    <h2>Our Story</h2>
                    <p>
                        Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.
                    </p>
                    <p>
                        Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging  from consumer.
                    </p>
                </div>
                <div>
                    <img src="/public/side-about.svg" alt="About Us" className="w-full h-auto" />
                </div>
            </div>
            <div className="about-page__intro">
                {INTRO_LIST.map((item, index) => (
                    <Feature
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.icon}
                        className="about-page__intro__intro-item"
                    />
                ))}
            </div>

            <div className="about-page__team">
                {AVATAR_DEFAULT.map((item, index) => (
                    <Avatar
                        key={index}
                        name={item.name}
                        position={item.position}
                        image={item.image}
                        className="about-page__team__avatar"
                    />
                ))}
            </div>

            <div className="about-page__feature">
                {FEATURE_LIST.map((item, index) => (
                    <Feature
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        className="about-page__feature__feature-item"
                    />
                ))}
            </div>


        </div>
    )
}