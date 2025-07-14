import { MyProfileForm } from "./components";
import './style.scss';
import { Link } from "react-router-dom";

export function ManageAccountPage() {
    return (
        <div className="manage-account-page">
            <div className="manage-account-page__sidebar">
                <div className="manage-account-page__sidebar__terms">
                    <label>Manage My Account</label>
                    <ul>
                        <li>
                            <button>My Profile</button>
                        </li>
                        <li>
                            <button>Address Book</button>
                        </li>
                        <li>
                            <button>My Payment Options</button>
                        </li>
                    </ul>
                </div>
                <div className="manage-account-page__sidebar__terms">
                    <label>My Orders</label>
                    <ul>
                        <li>
                            <button>My Returns</button>
                        </li>
                        <li>
                            <button>My Cancellations</button>
                        </li>
                    </ul>
                </div>
                <div className="manage-account-page__sidebar__terms">
                    <label><Link to="/my-wishlist">My Wishlist</Link></label>
                </div>
            </div>

            <div className="manage-account-page__form">
                <MyProfileForm />
            </div>
        </div>
    );
}