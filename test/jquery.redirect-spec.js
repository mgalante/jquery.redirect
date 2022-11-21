'use strict';

describe('jquery.redirect', function () {
  var url = '/test';
  var method = 'POST';

  it('creates a form representing the object passed in', function () {
    var query = {
      string: 'string',
      number: 5,
      boolean: true,
      array: ['1', '2', '3'],
      object: {
        a: 'a',
        b: 'b'
      },
      array_with_object: [{
        a: '1',
        b: '2'
      },
      {
        a: '3',
        b: '4'
      }],
      empty: null,
      nested: {
        string: 'value',
        array: ['1', '2', '3'],
        array_with_object: [{
          nested_key: '1'
        }]
      }
    };

    var formGenerated = $.redirect.getForm(url, query, method);
    // expect(form.serializeObject()).toEqual(query);
    expect(formGenerated.form.html()).toEqual([
      '<input type="hidden" name="string" value="string">',
      '<input type="hidden" name="number" value="5">',
      '<input type="hidden" name="boolean" value="true">',
      '<input type="hidden" name="array[0]" value="1">',
      '<input type="hidden" name="array[1]" value="2">',
      '<input type="hidden" name="array[2]" value="3">',
      '<input type="hidden" name="object[a]" value="a">',
      '<input type="hidden" name="object[b]" value="b">',
      '<input type="hidden" name="array_with_object[0][a]" value="1">',
      '<input type="hidden" name="array_with_object[0][b]" value="2">',
      '<input type="hidden" name="array_with_object[1][a]" value="3">',
      '<input type="hidden" name="array_with_object[1][b]" value="4">',
      '<input type="hidden" name="nested[string]" value="value">',
      '<input type="hidden" name="nested[array][0]" value="1">',
      '<input type="hidden" name="nested[array][1]" value="2">',
      '<input type="hidden" name="nested[array][2]" value="3">',
      '<input type="hidden" name="nested[array_with_object][0][nested_key]" value="1">'
    ].join(''));
  });

  it('discards empty fields with empty value', function () {
    var query = {
      string: '',
      number: 5,
      boolean: true,
      array: ['1', '2', '3'],
      object: {
        a: 'a',
        b: ''
      }
    };
    var formGenerated = $.redirect.getForm(url, query, method, null, null);

    expect(formGenerated.form.html()).toEqual([
      '<input type="hidden" name="number" value="5">',
      '<input type="hidden" name="boolean" value="true">',
      '<input type="hidden" name="array[0]" value="1">',
      '<input type="hidden" name="array[1]" value="2">',
      '<input type="hidden" name="array[2]" value="3">',
      '<input type="hidden" name="object[a]" value="a">'
    ].join(''));
  });

  it('keeps field with empty value when shouldKeepBlankFields is set to true', function () {
    var query = {
      string: '',
      number: 5,
      boolean: true,
      array: ['1', '2', '3'],
      object: {
        a: '',
        b: 'b'
      }
    };
    var formGenerated = $.redirect.getForm(url, query, method, null, null, true);

    expect(formGenerated.form.html()).toEqual([
      '<input type="hidden" name="string" value="">',
      '<input type="hidden" name="number" value="5">',
      '<input type="hidden" name="boolean" value="true">',
      '<input type="hidden" name="array[0]" value="1">',
      '<input type="hidden" name="array[1]" value="2">',
      '<input type="hidden" name="array[2]" value="3">',
      '<input type="hidden" name="object[a]" value="">',
      '<input type="hidden" name="object[b]" value="b">'
    ].join(''));
  });
});
