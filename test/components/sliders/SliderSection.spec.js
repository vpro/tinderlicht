import SliderSection from '../../../src/components/sliders/SliderSection.jsx';
import { React, TestUtils, testdom } from '../../react-helpers';

describe("SliderSection", () => {
  let element;

  let cb;

  beforeEach(() => {
    testdom('<html><body></body></html>');
  });

  describe("when model is resource", () => {

    beforeEach(() => {
      let criteria = { clarity: 1 };
      cb = sinon.spy();
      element = renderSliderSection(criteria, cb);
    });

    it("renders the SliderSection in the sidebar", () => {
      expect(element.className).to.contain('sliders-container');
    });

    it("renders the correct value for clarity", () => {
      let el = element.querySelector('input[name="clarity"]');
      expect(el.value).to.equal('1');
    });

    describe("handle change", ()=> {
      it('triggers the callback', () => {
        let input = element.querySelector('input[name="clarity"]');
        TestUtils.Simulate.change(input, { target: { value: 2 } });
        expect(cb).to.be.calledWith('clarity', 2);
      });
    });
  });
});

function renderSliderSection(criteria, cb){
  let container = TestUtils.renderIntoDocument(
    <SliderSection criteria={ criteria } handleChange={ cb }/>
  );

  return React.findDOMNode(container);
}
