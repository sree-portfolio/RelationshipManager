import uuid
from django.db import models

class Person(models.Model):
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    )

    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    contact_details = models.TextField(blank=True)

    def __str__(self):
        return self.name
    
class Relationship(models.Model):
    RELATIONSHIP_CHOICES = (
        ('parent', 'Parent'),
        ('grandparent', 'Grandparent'),
        ('partner', 'Partner'),
        ('child', 'Child'),
        ('friend', 'Friend'),
    )
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='from_relationships')
    to_person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='to_relationships')
    relationship_type = models.CharField(max_length=50, choices=RELATIONSHIP_CHOICES)

    def __str__(self):
        return f"{self.from_person} - {self.to_person} ({self.relationship_type})"