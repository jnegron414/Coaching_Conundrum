# Generated by Django 3.0.7 on 2024-03-22 21:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coaching', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coachingsessionfeedback',
            name='rating',
            field=models.IntegerField(choices=[(1, 1), (2, 2), (3, 3), (4, 4)]),
        ),
    ]
