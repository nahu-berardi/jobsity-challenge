import { AppBar } from "@material-ui/core";
import './Header.scss';

export function Header() {
    return (
        <AppBar position="static" className="header-container">
            <div className="header-tab-container">
                <p className="header-tab-item">Sunday</p>
                <p className="header-tab-item">Monday</p>
                <p className="header-tab-item">Tuesday</p>
                <p className="header-tab-item">Wednesday</p>
                <p className="header-tab-item">Thursday</p>
                <p className="header-tab-item">Friday</p>
                <p className="header-tab-item">Saturday</p>
            </div>
        </AppBar>
    );
}