# BastionPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.595324Z
**Run ID**: RUN-018
**Seed**: 1700000018

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: voting_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: ring_buffer
- Commit Method: index_based

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: size_based

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: crash_stop

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 402ms
- Election Timeout Base: 442ms
- Election Timeout Range: 85ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_to_highest_term
- log:command_log
- log_structure:ring_buffer
- commit:index_based
- recovery:snapshot_transfer
- snapshot:size_based
- dynamic_membership:add_node
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 40
- Election Success Rate: 67.80%
- Messages Sent: 166
- Commits: 17
- Avg Messages/Commit: 9.76
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 63
- Elections Succeeded: 59
- Election Success Rate: 93.65%
- Messages Sent: 336
- Commits: 28
- Avg Messages/Commit: 12.00
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 47
- Election Success Rate: 79.66%
- Messages Sent: 349
- Commits: 20
- Avg Messages/Commit: 17.45
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 54
- Elections Succeeded: 54
- Election Success Rate: 100.00%
- Messages Sent: 634
- Commits: 17
- Avg Messages/Commit: 37.29
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

