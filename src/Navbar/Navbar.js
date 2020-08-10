import React from 'react';
import styles from './Navbar.module.css';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
const Navbar = () => {
    return (
        <div className = {styles.navbar}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                    Dijkstra's Pathfinding Algorithm
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Navbar;