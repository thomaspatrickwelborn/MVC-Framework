const testGroupSummaryTemplate = `
<test-group-summary>
  <test-group-summary-title></test-group-summary-title>
  <test-group-summary-pass></test-group-summary-pass>
</test-group-summary>
`

const testItemSummaryTemplate = `
<test-item-summary>
  <test-item-summary-title></test-item-summary-title>
  <test-item-summary-pass></test-item-summary-pass>
  <test-item-summary-parse></test-item-summary-parse>
</test-item-summary>
`
const testQualityTemplate = `
<test-quality>
  <test-quality-string></test-quality-string>
  <test-quality-value></test-quality-value>
  <test-quality-statement></test-quality-statement>
</test-quality>
`
const testItemTemplate = `
<test-item>
  <test-item-title></test-item-title>
  <---TEST_QUALITY--->
</test-item>
`
const testGroupTemplate = `
<test-group>
  <test-group-title></test-group-title>
  <---TEST_ITEM--->
</test-group>
`
const testTemplate = `
<test>
  <test-title></test-title>
  <---TEST_GROUP--->
</test>
`