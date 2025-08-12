import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import VIcon from './VIcon.vue';

describe('VIcon', () => {
  it('should render correctly', () => {
    const wrapper = mount(VIcon);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render slot content', () => {
    const wrapper = mount(VIcon, {
      slots: {
        default: '<svg><path d="M0 0h24v24H0z" fill="none"/></svg>',
      },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('should apply color prop', () => {
    const wrapper = mount(VIcon, {
      props: {
        color: 'red',
      },
    });
    expect(wrapper.attributes('style')).toContain('color: red');
  });

  it('should apply size prop', () => {
    const wrapper = mount(VIcon, {
      props: {
        size: 24,
      },
    });
    expect(wrapper.attributes('style')).toContain('font-size: 24px');
  });
});
