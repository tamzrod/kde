# AnchorFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.006851Z
**Run ID**: RUN-083
**Seed**: 1700000083

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: hash_chain
- Commit Method: majority_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: byzantine

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 426ms
- Election Timeout Base: 237ms
- Election Timeout Range: 262ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- voting:read_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:command_log
- log_structure:hash_chain
- commit:majority_commit
- recovery:snapshot_transfer
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 42
- Elections Succeeded: 35
- Election Success Rate: 83.33%
- Messages Sent: 154
- Commits: 18
- Avg Messages/Commit: 8.56
- Leader Changes: 35
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 39
- Election Success Rate: 73.58%
- Messages Sent: 231
- Commits: 13
- Avg Messages/Commit: 17.77
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 45
- Election Success Rate: 84.91%
- Messages Sent: 373
- Commits: 19
- Avg Messages/Commit: 19.63
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 65
- Elections Succeeded: 60
- Election Success Rate: 92.31%
- Messages Sent: 573
- Commits: 30
- Avg Messages/Commit: 19.10
- Leader Changes: 60
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

