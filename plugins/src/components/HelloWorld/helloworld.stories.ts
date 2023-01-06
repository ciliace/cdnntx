import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';

import './HelloWorld';
import { HelloWorld } from './HelloWorld';

export default {
  title: 'Hello World',
  component: 'ntx-helloworld',
} as Meta;

const Template: Story<HelloWorld> = ({ name }) => {
  return html`<ntx-helloworld
    .name=${name}
  >
  </ntx-helloworld>`;
};

export const Base: Story<HelloWorld> = Template.bind({});
Base.args = {
  name: 'Name'
};
