from django.contrib import admin
from .models import Person, Relationship

@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'gender')
    list_filter = ('gender',)
    search_fields = ('name', 'contact_details')

@admin.register(Relationship)
class RelationshipAdmin(admin.ModelAdmin):
    list_display = ('from_person', 'to_person', 'relationship_type')
    list_filter = ('relationship_type',)
    search_fields = ('from_person__name', 'to_person__name')

admin.site.site_header = 'My Relationship App Admin'
admin.site.site_title = 'Relationship App Admin Panel'