from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status

from .models import Person, Relationship
from .serializers import PersonSerializer, RelationshipSerializer


class PersonListCreateView(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class PersonRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer


class RelationshipListCreateView(generics.ListCreateAPIView):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

    def create(self, request, *args, **kwargs):
        from_person_id = request.data.get("from_person")
        to_person_id = request.data.get("to_person")

        if from_person_id == to_person_id:
            return Response(
                {
                    "message": 'You cannot create a relationship with the same "from_person" and "to_person".'
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Check if the  relationship already exists
        exist_relationship = Relationship.objects.filter(
            from_person=from_person_id, to_person=to_person_id
        )
        if exist_relationship.exists():
            return Response(
                {"message": "A relationship already exists for these persons."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the reverse relationship already exists
        reverse_relationship = Relationship.objects.filter(
            from_person=to_person_id, to_person=from_person_id
        )
        if reverse_relationship.exists():
            return Response(
                {"message": "A reverse relationship already exists for these persons."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Check if there are already 2 parent relationships for the "to_person"
        parent_relationships_count = Relationship.objects.filter(
            to_person=to_person_id, relationship_type="parent"
        ).count()

        if parent_relationships_count >= 2:
            return Response(
                {
                    "message": "You cannot create more than 2 parent relationships for the same person."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Check if there are already 2 parent relationships for the "from_person"
        from_person_parent_relationships_count = Relationship.objects.filter(
            from_person=from_person_id, relationship_type="parent"
        ).count()
        if from_person_parent_relationships_count >= 2:
            return Response(
                {
                    "message": "You cannot create more than 2 parent relationships for the same person."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().create(request, *args, **kwargs)


class RelationshipRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer

    def create(self, request, *args, **kwargs):
        from_person_id = request.data.get("from_person")
        to_person_id = request.data.get("to_person")

        if from_person_id == to_person_id:
            return Response(
                {
                    "message": 'You cannot create a relationship with the same "from_person" and "to_person".'
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the reverse relationship already exists
        reverse_relationship = Relationship.objects.filter(
            from_person=to_person_id, to_person=from_person_id
        )
        if reverse_relationship.exists():
            return Response(
                {"message": "A reverse relationship already exists for these persons."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Check if the  relationship already exists
        exist_relationship = Relationship.objects.filter(
            from_person=from_person_id, to_person=to_person_id
        )
        if exist_relationship.exists():
            return Response(
                {"message": "A relationship already exists for these persons."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Check if there are already 2 parent relationships for the "to_person"
        parent_relationships_count = Relationship.objects.filter(
            to_person=to_person_id, relationship_type="parent"
        ).count()

        if parent_relationships_count >= 2:
            return Response(
                {
                    "message": "You cannot create more than 2 parent relationships for the same person."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        # Check if there are already 2 parent relationships for the "from_person"
        from_person_parent_relationships_count = Relationship.objects.filter(
            from_person=from_person_id, relationship_type="parent"
        ).count()
        if from_person_parent_relationships_count >= 2:
            return Response(
                {
                    "message": "You cannot create more than 2 parent relationships for the same person."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().create(request, *args, **kwargs)
