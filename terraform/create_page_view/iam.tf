
data "aws_iam_policy_document" "lambda_dynamodb_policy" {
  statement {
    actions = [
      "dynamodb:PutItem"
    ]

    resources = [
      aws_dynamodb_table.page_traffic.arn
    ]
  }
}

resource "aws_iam_policy" "lambda_dynamodb" {
  name   = "lambda-dynamodb-policy"
  policy = data.aws_iam_policy_document.lambda_dynamodb_policy.json
}

resource "aws_iam_policy_attachment" "lambda_policy_attachment" {
  name       = "lambda-dynamodb-policy-attach"
  roles      = [aws_iam_role.lambda_exec_role.name]
  policy_arn = aws_iam_policy.lambda_dynamodb.arn
}

