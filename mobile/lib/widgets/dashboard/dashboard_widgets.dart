import 'package:flutter/material.dart';

// Karta statystyk
class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final Color color;
  final IconData? icon;

  const StatCard({
    Key? key,
    required this.title,
    required this.value,
    required this.color,
    this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(4),
          border: Border(
            top: BorderSide(
              color: color,
              width: 4,
            ),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  if (icon != null) ...[
                    Icon(icon, color: Colors.grey[600], size: 18),
                    SizedBox(width: 8),
                  ],
                  Text(
                    title,
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
              SizedBox(height: 8),
              Text(
                value,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// Element listy aktywności
class ActivityItem extends StatelessWidget {
  final String title;
  final String description;
  final String timeAgo;
  final IconData icon;
  final Color iconColor;

  const ActivityItem({
    Key? key,
    required this.title,
    required this.description,
    required this.timeAgo,
    required this.icon,
    required this.iconColor,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: iconColor,
        child: Icon(icon, color: Colors.white),
      ),
      title: Text(title),
      subtitle: Text(description),
      trailing: Text(timeAgo),
    );
  }
}

// Lista aktywności
class ActivityList extends StatelessWidget {
  final List<Map<String, dynamic>> activities;

  const ActivityList({
    Key? key,
    required this.activities,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
      itemCount: activities.length,
      separatorBuilder: (context, index) => Divider(),
      itemBuilder: (context, index) {
        final activity = activities[index];
        return ActivityItem(
          title: activity['title'],
          description: activity['description'],
          timeAgo: activity['timeAgo'],
          icon: activity['icon'],
          iconColor: activity['iconColor'],
        );
      },
    );
  }
}

// Sekcja nagłówkowa dashboardu
class DashboardHeader extends StatelessWidget {
  final String username;

  const DashboardHeader({
    Key? key,
    required this.username,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Witaj, $username!',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'Jesteś teraz zalogowany w aplikacji.',
              style: TextStyle(
                fontSize: 16,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Siatka statystyk
class StatsGrid extends StatelessWidget {
  final List<Map<String, dynamic>> stats;

  const StatsGrid({
    Key? key,
    required this.stats,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        childAspectRatio: 1.5,
      ),
      itemCount: stats.length,
      itemBuilder: (context, index) {
        final stat = stats[index];
        return StatCard(
          title: stat['title'],
          value: stat['value'],
          color: stat['color'],
          icon: stat['icon'],
        );
      },
    );
  }
}

// Nagłówek sekcji
class SectionHeader extends StatelessWidget {
  final String title;
  final VoidCallback? onSeeAll;

  const SectionHeader({
    Key? key,
    required this.title,
    this.onSeeAll,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        if (onSeeAll != null)
          TextButton(
            onPressed: onSeeAll,
            child: Text('Zobacz wszystko'),
          ),
      ],
    );
  }
}
