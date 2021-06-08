import _ from 'lodash';

export function whereConditional(object: Object, operator: 'OR' | 'AND', alias?: string): string {
    let where = ""
    Object.entries(_.pickBy(object)).forEach(([key, value], index, array) => {
        if (alias)
            key = alias + '.' + key

        if (typeof value === 'string')
            (value: string | undefined) => () => value = _.toUpper(value)

        where += key + ' = "' + value + '"'

        if (index != array.length - 1)
            where += ' ' + operator + ' '
    });

    return where;
}