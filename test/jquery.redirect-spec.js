'use strict';

describe('jquery.redirect', function() {
  var url = '/test';
  var method = 'POST'

  it('creates a form representing the object passed in', function() {
    var query = {
      string: 'value',
      array: ['1', '2', '3'],
      array_with_object: [{
        nested_key: '1'
      }],
      nested: {
        string: 'value',
        array: ['1', '2', '3'],
        array_with_object: [{
          nested_key: '1'
        }]
      }
    };

    var form = $.redirectBuildForm(url, query, method);

    expect(form.serializeObject()).toEqual(query);
    expect(form.html()).toEqual([
      '<input type="hidden" name="string" value="value">',
      '<input type="hidden" name="array[]" value="1">',
      '<input type="hidden" name="array[]" value="2">',
      '<input type="hidden" name="array[]" value="3">',
      '<input type="hidden" name="array_with_object[][nested_key]" value="1">',
      '<input type="hidden" name="nested[string]" value="value">',
      '<input type="hidden" name="nested[array][]" value="1">',
      '<input type="hidden" name="nested[array][]" value="2">',
      '<input type="hidden" name="nested[array][]" value="3">',
      '<input type="hidden" name="nested[array_with_object][][nested_key]" value="1">'
    ].join(''));
  });
});
