# BastionConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:44.919942Z
**Run ID**: RUN-005
**Seed**: 1700000005

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: voting_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: write_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: linked_list
- Commit Method: quorum_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: leader_change

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: gossip
- Model: crash_stop

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 180ms
- Election Timeout Base: 326ms
- Election Timeout Range: 123ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:term_epochs
- concept:lease_based_leadership
- voting:write_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:command_log
- log_structure:linked_list
- commit:quorum_commit
- recovery:log_catchup
- snapshot:leader_change
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 56
- Elections Succeeded: 41
- Election Success Rate: 73.21%
- Messages Sent: 154
- Commits: 12
- Avg Messages/Commit: 12.83
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 65
- Elections Succeeded: 65
- Election Success Rate: 100.00%
- Messages Sent: 454
- Commits: 38
- Avg Messages/Commit: 11.95
- Leader Changes: 65
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 58
- Elections Succeeded: 57
- Election Success Rate: 98.28%
- Messages Sent: 485
- Commits: 25
- Avg Messages/Commit: 19.40
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 52
- Elections Succeeded: 41
- Election Success Rate: 78.85%
- Messages Sent: 489
- Commits: 14
- Avg Messages/Commit: 34.93
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

