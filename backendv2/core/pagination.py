from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
import math

class CustomPagination(PageNumberPagination):
    page_size = 10 
    page_size_query_param = 'limit'
    
    def get_paginated_response(self, data):
        total_pages = math.ceil(self.page.paginator.count / self.get_page_size(self.request))
        return Response({
            'count': self.page.paginator.count,
            'page': self.page.number,
            'limit': self.get_page_size(self.request),
            'total_pages': total_pages,
            'results': data
        })
