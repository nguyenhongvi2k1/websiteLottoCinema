# Generated by Django 4.2.1 on 2023-07-03 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0009_alter_myrating_id_movie'),
    ]

    operations = [
        migrations.AddField(
            model_name='myrating',
            name='timestamp',
            field=models.IntegerField(default=0),
        ),
    ]