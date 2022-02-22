import { AppBar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import CasinoIcon from '@mui/icons-material/Casino';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import DeleteAccount from "./DeleteAccount";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const navigate = useNavigate();

    const handleSettingsMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <Typography variant="white">
                    Change password</Typography>
            </MenuItem>
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <DeleteAccount />
            </MenuItem>
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <Logout />
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}
            >
                <IconButton size="large" aria-label="show 4 new mails" color="input" onClick={() => {
                                navigate('/mygames')
                            }}>
                        <CasinoIcon />
                </IconButton>
                <Typography variant="white" onClick={() => {
                                navigate('/mygames')
                            }}>
                    Your games
                </Typography>
            </MenuItem>
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}
            >
                <IconButton size="large" aria-label="show 4 new messages" color="input">
                    <Badge badgeContent={4} color="error">
                        <ChatIcon />
                    </Badge>
                </IconButton>
                <Typography variant="white">
                    Messages
                </Typography>
            </MenuItem>
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="input"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography variant="white">
                    Notifications
                </Typography>
            </MenuItem>
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    color="input"
                    onClick={() => {
                        navigate('/profile')
                    }}
                >
                    <AccountCircle />
                </IconButton>
                <Typography variant="white" onClick={() => {
                        navigate('/profile')
                    }}>
                    Profile
                </Typography>
            </MenuItem>
            <MenuItem style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <IconButton
                    size="large"
                    aria-label="friends of current user"
                    color="input"
                    onClick={() => {
                        navigate('/friendgroups')
                    }}
                >
                    <PeopleAltIcon />
                </IconButton>
                <Typography variant="white" onClick={() => {
                                navigate('/friendgroups')
                            }}>
                    Friends and groups
                </Typography>
            </MenuItem>
            <MenuItem onClick={handleSettingsMenuOpen} style={{ backgroundColor: 'rgba(52, 45, 43, 0.959)' }}>
                <IconButton
                    size="large"
                    aria-label="settings"
                    aria-controls="primary-settings-menu"
                    aria-haspopup="true"
                    color="input"
                >
                    <SettingsIcon />
                </IconButton>
                <Typography variant="white">
                    Settings
                </Typography>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        onClick={() => {
                            navigate('/')
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <IconButton
                            size="large"
                            aria-label="home"
                            color="input"
                            onClick={() => {
                                navigate('/')
                            }}
                        >
                            <HomeIcon />
                        </IconButton>
                    <IconButton
                            size="large"
                            aria-label="games of current user"
                            color="input"
                            onClick={() => {
                                navigate('/mygames')
                            }}
                        >
                            <CasinoIcon />
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new messages" color="input">
                            <Badge badgeContent={4} color="error">
                                <ChatIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="input"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            color="input"
                            onClick={() => {
                                navigate('/profile')
                            }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="friends of current user"
                            color="input"
                            onClick={() => {
                                navigate('/friendgroups')
                            }}
                        >
                            <PeopleAltIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="settings"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleSettingsMenuOpen}
                            color="input"
                        >
                            <SettingsIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }} >
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="input"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}