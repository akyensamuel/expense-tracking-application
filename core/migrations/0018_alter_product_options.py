# Generated by Django 5.1.2 on 2025-06-18 19:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_settings_populated_monthly_spending'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-date']},
        ),
    ]
