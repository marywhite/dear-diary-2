import execa from 'execa'
import test from 'ava'
import {version as pkgVersion} from './package'

test('output version', async t => {
  t.is(await execa.stdout('./cli.js', ['--version']), pkgVersion)
})

test('show help', async t => {
  t.regex(await execa.stdout('./cli.js', ['--help']), /Usage/)
})

test('myname', async t => {
  t.plan(2)
  const sets = await execa.stdout('./cli.js', ['myname', 'jane'])
  t.regex(sets, /nice to meet you jane/)
  const gets = await execa.stdout('./cli.js', ['myname'])
  t.regex(gets, /hi how are you jane/)
})

test('throws exception', async t => {
  const {stdout} = await t.throws(execa('./cli.js'))
  t.regex(stdout, /i don't have anything for that, dear/)
})
