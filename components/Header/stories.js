import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './index'

storiesOf('Header', module)
    .addParameters({
        backgrounds: [
        { name: 'dark', value: '#1E2428', default: true },
        ],
    })
    .add('default', () => (
        <Header
            menuItems={[
            {
                href: "#",
                text: "Information and advice"
            },
            {
                href: "#",
                text: "Explore your needs"
            },
            {
                href: "#",
                text: "Log in"
            },
            {
                href: "#",
                text: "Sign up"
            },
            ]}
            />
    ))