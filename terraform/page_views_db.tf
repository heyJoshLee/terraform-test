resource "aws_dynamodb_table" "page_traffic" {
  name           = "PageTraffic"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "Id"

  attribute {
    name = "Id"
    type = "S"
  }
}