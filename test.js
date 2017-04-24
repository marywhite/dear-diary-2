import execa from 'execa'
import test from 'ava'
import {version as pkgVersion} from './package'

test('output version', async t => {
  t.is(await execa.stdout('./cli.js', ['--version']), pkgVersion)
})

test('show help', async t => {
  t.regex(await execa.stdout('./cli.js', ['--help']), /Usage/)
})
