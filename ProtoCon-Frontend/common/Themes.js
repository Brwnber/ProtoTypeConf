import React from 'react';

export const themes = {
    light: {
        primary: '#fff',
        primaryText: '#1b164a',
        alt: '#e06162',
        altText: '#fff',
        secondaryBackground: 'rgba(155, 155, 155, 0.18)',
        icons: '#f6bb61',
        circleColorOne: '#1b164a',
        circleColorTwo: '#e06162',
        circleColorThree: '#f6bb61',
        schedule: ['rgba(224, 97, 98, 0.1)', 'rgba(246, 187, 97, 0.1)', 'rgba(27, 22, 74, 0.1)'],
        calendarTimeText: '#000',
        border: '#bababa'
    },
    dark: {
        primary: '#161428',
        primaryText: '#fff',
        alt: '#0397d6',
        altText: '#fff',
        secondaryBackground: '#252839',
        icons: '#21966b',
        circleColorOne: '#161428',
        circleColorTwo: '#00457c',
        circleColorThree: '#677077',
        schedule: ['rgba(33, 150, 107, 0.23)', 'rgba(3, 151, 214, 0.23)', 'rgba(103, 112, 119, 0.23)'],
        calendarTimeText: '#fff',
        border: 'rgba(103, 112, 119, 0.23)'
    }
};

export const ThemeContext = React.createContext(
    themes.light
);