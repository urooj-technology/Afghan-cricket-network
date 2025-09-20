from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.core.cache import cache
from collections import OrderedDict


class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
    
    def paginate_queryset(self, queryset, request, view=None):
        page_size = request.query_params.get(self.page_size_query_param, None)
        
        if page_size == 'all':
            return None
            
        if page_size:
            try:
                self.page_size = min(int(page_size), self.max_page_size)
            except ValueError:
                self.page_size = 20
        
        return super().paginate_queryset(queryset, request, view)
    
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('page_size', self.page_size),
            ('total_pages', self.page.paginator.num_pages),
            ('current_page', self.page.number),
            ('results', data)
        ]))
    
    def paginate_and_serialize(self, queryset, serializer_class, request, context=None):
        page = self.paginate_queryset(queryset, request)
        if page is not None:
            serializer = serializer_class(page, many=True, context=context or {})
            return self.get_paginated_response(serializer.data)
        else:
            serializer = serializer_class(queryset, many=True, context=context or {})
            return Response({
                'count': queryset.count(),
                'results': serializer.data
            })


class OptimizedPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 50
    
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))


class LargePagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 200
