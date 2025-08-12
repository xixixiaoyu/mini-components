import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VButton from './VButton.vue';

describe('VButton', () => {
  it('should render correctly', () => {
    const wrapper = mount(VButton);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render slot content', () => {
    const wrapper = mount(VButton, {
      slots: {
        default: 'Click Me',
      },
    });
    expect(wrapper.text()).toBe('Click Me');
  });
});
