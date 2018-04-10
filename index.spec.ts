import { expect } from 'chai';
import { castDocument, castFilter } from './index';

describe('tests', () => {
  describe('.castDocument()', () => {
    it('should cast date', () => {
      expect(castDocument({
        created: '2017',
      }, {
        created: Date,
      }).created).to.instanceOf(Date);
    });
    it('should not cast other values', () => {
      expect(castDocument({
        updated: '2017',
      }, {
        created: Date,
      }).updated).to.a('string');
    });
    it('should cast nested values', () => {
      expect(castDocument({
        property: {
          date: '2017',
        },
      }, {
        'property.date': Date,
        'updated': Date,
      }).property.date).to.instanceOf(Date);
    });
    it('should cast array values', () => {
      const result = castDocument({
        dates: ['2016', '2017'],
      }, {
        'dates': Date,
      });

      expect(result.dates[0]).to.instanceOf(Date);
      expect(result.dates[1]).to.instanceOf(Date);
    });
  });
  describe('.castFilter()', () => {
    it('should cast date', () => {
      expect(castFilter({
        'created': '2017',
      }, {
        created: Date,
      }).created).to.instanceOf(Date);
    });
    it('should not cast other values', () => {
      expect(castFilter({
        'property.date': '2017',
      }, {
        'created': Date,
      })['property.date']).to.a('string');
    });
    it('should cast nested values', () => {
      expect(castFilter({
        'property.date': '2017',
      }, {
        'property.date': Date,
      })['property.date']).to.instanceOf(Date);
    });
    it('should cast array', () => {
      expect(castFilter({
        'property.dates': ['2017'],
      }, {
        'property.dates': Date,
      })['property.dates'][0]).to.instanceOf(Date);
    });
    it('should cast object', () => {
      const result = castFilter({
        'property.dates': { $in: ['2017'] },
      }, {
        'property.dates': Date,
      });
      expect(result['property.dates'].$in[0]).to.instanceOf(Date);
    });
  });
});
