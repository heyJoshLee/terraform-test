resource "aws_api_gateway_rest_api" "page_view_api" {
  name        = "PageViewAPI"
  description = "API Gateway for page views"
}

resource "aws_api_gateway_resource" "page_view_resource" {
  rest_api_id = aws_api_gateway_rest_api.page_view_api.id
  parent_id   = aws_api_gateway_rest_api.page_view_api.root_resource_id
  path_part   = "pageview"
}