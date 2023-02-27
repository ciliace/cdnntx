import { Meta, Story } from '@storybook/web-components';
import { html } from 'lit';

import '../components/HeroList/HeroList';
import { data, HeroList } from '../components/HeroList/HeroList';

export default {
  title: 'Plugins/Hero List',
  component: 'ntx-herolist',
} as Meta;

const Template: Story<HeroList> = ({ list }) => {
  return html`<ntx-herolist
    .list=${list}
  >
  </ntx-herolist>`;
};

export const Base: Story<HeroList> = Template.bind({});
Base.args = {
  list: 
  [{"id":0,"value":"Cats","summary":"Cats are the very best pets."},{"id":1,"value":"Dogs","summary":"Dogs have a lot of energy."},{"id":2,"value":"Hippos","summary":"Hippos are very fat and mean."},{"id":3,"value":"Elephants","summary":"Elephants are really huge."},{"id":4,"value":"Mosquitoes","summary":"Mosquitoes bite you."},{"id":5,"value":"Snakes","summary":"Snakes are pretty scary."},{"id":6,"value":"Frogs","summary":"Frogs are amphibious."},{"id":7,"value":"Alligators","summary":"Alligators sneak up on you."},{"id":8,"value":"Cows","summary":"Cows make good hamburgers."}]
  
};
