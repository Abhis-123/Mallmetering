from rest_framework import serializers

from django.contrib.auth.models import User
from Superadmin.models import Superadmin,Memory,CustomerModel,SupervisorModel,Meters,Meter_Readings
from Subadmins.models import Connections

from django.core.files.base import ContentFile
import base64
import six
import uuid


class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:
                # Break out the header from the base64 content
                header, data = data.split(';base64,')
            # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            # Generate file name:
            file_name = str(uuid.uuid4())[:12] # 12 characters are more than enough.
            # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = "%s.%s" % (file_name, file_extension, )
            data = ContentFile(decoded_file, name=complete_file_name)
        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        # extension = "jpg" if extension == "jpeg" else extension

        return extension



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerModel
        fields = ['id', 'username', 'email','status','address','mobile_no','subscription','time_stamp','profile_pic','linked']


class RegisterSerializerCustomer(serializers.ModelSerializer):
    profile_pic= Base64ImageField(max_length=None, use_url=True,)

    class Meta:
        model = CustomerModel
        fields = "_all_"
        extra_kwargs = {'password': {'write_only': True}}

    def validate_profile_pic(self,profile_pic):
        return profile_pic

    def create(self, validated_data):
        CustomerModel.objects.create(username=validated_data['username']
        ,email=validated_data['email']
        ,password=validated_data['password']
        ,status=validated_data['status']
        ,mobile_no=validated_data['mobile_no']
        ,address=validated_data['address']
        ,subscription=validated_data['subscription']
        ,profile_pic=validated_data['profile_pic']
        )
        connection=Connections.objects.create(username=validated_data['username'],meter_name="Not Selected")

        return True
    def update(self,validated_data):
        instance = CustomerModel.objects.get(id=validated_data['id'])
        return validated_data


    def update(self,validated_data):
        instance = CustomerModel.objects.get(username=validated_data['username'])
        return validated_data

class Readings(serializers.ModelSerializer):
    class Meta:
        model = Meter_Readings
        fields = ('id', 'meter_id', 'reading_value','time_stamp')