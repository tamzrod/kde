# CipherUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.961883Z
**Run ID**: RUN-063
**Seed**: 1700000063

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: read_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: tree_structure
- Commit Method: quorum_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: periodic

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: timing

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 428ms
- Election Timeout Base: 248ms
- Election Timeout Range: 266ms

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

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:lease_based_leadership
- voting:read_quorum
- vote_granting:grant_to_highest_term
- log:command_log
- log_structure:tree_structure
- commit:quorum_commit
- recovery:incremental_snapshot
- snapshot:periodic
- dynamic_membership:add_node
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 51
- Election Success Rate: 86.44%
- Messages Sent: 188
- Commits: 15
- Avg Messages/Commit: 12.53
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 50
- Election Success Rate: 89.29%
- Messages Sent: 290
- Commits: 27
- Avg Messages/Commit: 10.74
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 56
- Elections Succeeded: 53
- Election Success Rate: 94.64%
- Messages Sent: 411
- Commits: 22
- Avg Messages/Commit: 18.68
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 51
- Elections Succeeded: 46
- Election Success Rate: 90.20%
- Messages Sent: 404
- Commits: 26
- Avg Messages/Commit: 15.54
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

