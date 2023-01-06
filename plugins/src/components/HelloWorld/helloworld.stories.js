import { html } from 'lit';
import './HelloWorld';
export default {
    title: 'Hello World',
    component: 'ntx-helloworld',
};
const Template = ({ name }) => {
    return html `<ntx-helloworld
    .name=${name}
  >
  </ntx-helloworld>`;
};
export const Base = Template.bind({});
Base.args = {
    name: 'Name'
};
